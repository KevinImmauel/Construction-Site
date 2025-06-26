from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect

postUpdate_bp = Blueprint('postUpdate', __name__)

@postUpdate_bp.route('/postUpdate', methods=['POST'])
@jwt_required(locations=['cookies'])
@csrf.exempt
def postUpdate():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()

    if not user:
        return {'msg': 'login da'}, 400
    
    data = request.json
    project_table_name = data.get('project_data_name')
    username = user.username
    update = data.get('update')
    percentage = data.get('percentage')

    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    if project_table_name not in tables:
        return {'err': 'Project table not found', 'available_tables': tables}, 400

    project_table = Table(project_table_name, db.metadata, autoload_with=db.engine)

    if not db.session.query(project_table).filter_by(username=username).first() and not user.isAdmin:
        return {'err': 'authorized'}

    project_table_update = Table(project_table_name+"_updates", db.metadata, autoload_with=db.engine)

    try:
        insert_query = project_table_update.insert().values(
            username=username,
            update_desc=update,
            approved=0,
            percentage=percentage
        )
        db.session.execute(insert_query)
        db.session.commit()
        return {'msg': 'update added successfully'}, 200
    except Exception as e:
        db.session.rollback()
        return {'err': f'Error: {str(e)}'}, 400
