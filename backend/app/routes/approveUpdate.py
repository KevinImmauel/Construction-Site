from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect, update

approveUpdate_bp = Blueprint('approveUpdate', __name__)

@approveUpdate_bp.route('/approveUpdate', methods=['PUT'])
@jwt_required(locations=['cookies'])
@csrf.exempt
def approveUpdate():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    username = user.username

    if not user:
        return {'msg': 'login da'}, 400
    
    data = request.json
    project_table_name = data.get('project_data_name')
    update_id = data.get('id')

    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    if project_table_name not in tables:
        return {'err': 'Project table not found'}, 400

    project_table = Table(project_table_name, db.metadata, autoload_with=db.engine)

    if not db.session.query(project_table).filter_by(username=username).first().isLeader and not user.isAdmin:
        return {'err': 'not authorized'}

    project_table_update = Table(project_table_name+"_updates", db.metadata, autoload_with=db.engine)
    
    percentage = db.session.query(project_table_update).filter_by(id=update_id).first().percentage
    
    try:
        insert_query = project_table_update.update().where(project_table_update.c.id==update_id).values(
            approved=1
        )
        another_one = (
            update(ProjectsTable)
            .where(ProjectsTable.projectname == project_table_name)
            .values(projectProgress=ProjectsTable.projectProgress + percentage)
)
        db.session.execute(insert_query)
        db.session.execute(another_one)
        db.session.commit()
        return {'msg': 'approved successfully'}, 200
    except Exception as e:
        db.session.rollback()
        return {'err': f'Error: {str(e)}'}, 400
