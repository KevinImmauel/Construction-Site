from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect

getpro_bp = Blueprint('getpro', __name__)

@getpro_bp.route('/getpro', methods=['GET'])
@jwt_required(locations=["cookies"])
@csrf.exempt
def getpro():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 401

    inspector = inspect(db.engine)
    all_projects = ProjectsTable.query.all()
    visible_projects = []

    if user.isAdmin:
        visible_projects = [proj.projectname for proj in all_projects]
    else:
        for proj in all_projects:
            proj_table_name = proj.projectname
            if not inspector.has_table(proj_table_name):
                continue
            table = Table(proj_table_name, db.metadata, autoload_with=db.engine)
            if 'username' in table.columns:
                exists = db.session.query(table).filter_by(username=user.username).first()
                if exists:
                    visible_projects.append(proj.projectname)

    return jsonify({"projects": visible_projects}), 200

getproinfo_bp = Blueprint('getproinfo', __name__)

@getproinfo_bp.route('/getproinfo/<int:pro_id>', methods=['GET'])
@jwt_required(locations=["cookies"])
@csrf.exempt
def getproinfo(pro_id):
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 401

    inspector = inspect(db.engine)
    all_projects = ProjectsTable.query.all()
    current_project_table_str = ''
    current_project_progress = 0
    current_project_approval = 0

    for i in all_projects:
        if i.id == pro_id:
            current_project_table_str = i.projectname
            current_project_progress = i.projectProgress
            current_project_approval = i.approved
    if current_project_table_str == '':
        return jsonify({"err": "project doesn't exist"})
    
    table = Table(current_project_table_str, db.metadata, autoload_with=db.engine)

    leaders = db.session.query(table).filter_by(isLeader = 1)

    devs = db.session.query(table).filter_by(isLeader = 0)

    leader_list = []
    dev_list = []

    for l in leaders:
        leader_list.append({
            "username": l.username,
            "role": l.role
        })

    for d in devs:
        dev_list.append({
            "username": d.username,
            "role": d.role
        })

    return jsonify({
        "id": pro_id,
        "name": current_project_table_str,
        "progress": current_project_progress,
        "approved": current_project_approval,
        "leaders": leader_list,
        "devs": dev_list
    }), 200
