from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db,csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, Column, Integer, String, Boolean, inspect

createpro_bp = Blueprint('createProject',__name__)

@createpro_bp.route('/createProject',methods=['POST'])
@jwt_required(locations=['cookies'])
@csrf.exempt
def createpro():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user.isAdmin:
        return {'msg':'not Admin'}, 400
    data = request.json
    project_table_name = data.get('project_data_name')
    projectProgress = data.get('projectProgress',0)
    if not project_table_name or inspect(db.engine).has_table(project_table_name) or ProjectsTable.query.filter_by(projectname=project_table_name).first():
        return {'msg':'not a valid project name or already exists'} ,400
    
    metadata = db.metadata
    table = Table(
        project_table_name,
        metadata,
        Column('id',Integer,primary_key=True),
        Column('username',String,nullable=False),
        Column('isLeader',Boolean,nullable=False),
        Column('role',String,nullable=False)
    )

    updates_table = Table(
        project_table_name+'_updates',
        metadata,
        Column('id',Integer,primary_key=True),
        Column('username',String,nullable=False),
        Column('update_desc',String,nullable=False),
        Column('approved',Boolean,nullable=False),
        Column('percentage',Integer,nullable=False)
    )

    metadata.create_all(db.engine)
    
    newpro = ProjectsTable(
        projectname=project_table_name,
        projectProgress=projectProgress,
        approved = 0
    )

    try:
        db.session.add(newpro)
        db.session.commit()
        return {'msg':'nice'}, 200
    except Exception as e:
        db.session.rollback()
        return {'msg':f'err {e}'} , 400