from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect, update

approveProject_bp = Blueprint('approveProject', __name__)

@approveProject_bp.route('/approveProject', methods=['PUT'])
@jwt_required(locations=['cookies'])
@csrf.exempt
def approveProject():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()

    if not user:
        return {'msg': 'login da'}, 400
    
    if not user.isAdmin:
        return {'msg':'not admin bro'}, 400
    
    data = request.json
    project_table_name = data.get('project_data_name')

    if ProjectsTable.query.filter_by(projectname=project_table_name).first().approved == 1:
        return {'err':'already approved'}     

    project_table = Table(project_table_name, db.metadata, autoload_with=db.engine)

    user_list = db.session.query(project_table).filter_by(isLeader=0)

    lead_list = db.session.query(project_table).filter_by(isLeader=1)

    try:
        another_one = (
            update(ProjectsTable)
            .where(ProjectsTable.projectname == project_table_name)
            .values(approved = 1)
        )

        for i in user_list:
            okay = update(UserCreds).where(UserCreds.username == i.username).values(score=UserCreds.score + 100)
            db.session.execute(okay)

        for x in lead_list:
            kay = update(UserCreds).where(UserCreds.username == x.username).values(score=UserCreds.score + 200)
            db.session.execute(kay)
        db.session.execute(another_one)
        db.session.commit()
        return {'msg': 'approved successfully'}, 200
    except Exception as e:
        db.session.rollback()
        return {'err': f'Error: {str(e)}'}, 400
