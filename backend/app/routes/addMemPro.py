from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect

addMemPro_bp = Blueprint('addMemberPro', __name__)

@addMemPro_bp.route('/addMemberPro', methods=['POST'])
@jwt_required(locations=['cookies'])
@csrf.exempt
def addMemberPro():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()

    if not user or not user.isAdmin:
        return {'msg': 'Not Admin'}, 400
    
    data = request.json
    project_table_name = data.get('project_data_name')
    username = data.get('username')
    isLeader = data.get('isLeader')
    role = data.get('role')

    if not project_table_name or not username or isLeader is None or not role:
        return {'err': 'Invalid or missing fields'}, 400

    if not UserCreds.query.filter_by(username=username).first():
        return {'err': "User doesn't exist"}, 400

    if not ProjectsTable.query.filter_by(projectname=project_table_name).first():
        return {'err': 'Project not found'}, 400

    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    if project_table_name not in tables:
        return {'err': 'Project table not found', 'available_tables': tables}, 400

    project_table = Table(project_table_name, db.metadata, autoload_with=db.engine)

    try:
        insert_query = project_table.insert().values(
            username=username,
            isLeader=isLeader,
            role=role
        )
        db.session.execute(insert_query)
        db.session.commit()
        return {'msg': 'Member added successfully'}, 200
    except Exception as e:
        db.session.rollback()
        return {'err': f'Error: {str(e)}'}, 400