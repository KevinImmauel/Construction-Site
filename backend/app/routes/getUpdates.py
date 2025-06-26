from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect

getupdates_bp = Blueprint('getupdates', __name__)

@getupdates_bp.route('/getupdates', methods=['GET'])
@jwt_required(locations=["cookies"])
def getupdates():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 401
    
    data = request.json
    projectname = data.get('project_data_name')
    username=user.username
    inspector = inspect(db.engine)
    project = Table(projectname,db.metadata,autoload_with=db.engine)
    
    if not ProjectsTable.query.filter_by(projectname=projectname).first():
        return {'err': 'Project not found'}, 400
    
    if not user.isAdmin and not db.session.query(project).filter_by(username=username).first():
        return {"err":"not authorized"}
    
    project_updates = Table(projectname+"_updates",db.metadata,autoload_with=db.engine)

    try:
        query = db.session.query(project_updates.columns.update_desc)
        result = query.all()

        return {'data':f'{result}'}
    except Exception as e:
        return {'err': f'Error: {str(e)}'}, 400


getappupdates_bp = Blueprint('getappupdates', __name__)

@getappupdates_bp.route('/getappupdates', methods=['GET'])
@jwt_required(locations=["cookies"])
def getupdates():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 401
    
    data = request.json
    projectname = data.get('project_data_name')
    username=user.username
    inspector = inspect(db.engine)
    project = Table(projectname,db.metadata,autoload_with=db.engine)
    
    if not ProjectsTable.query.filter_by(projectname=projectname).first():
        return {'err': 'Project not found'}, 400
    
    if not user.isAdmin and not db.session.query(project).filter_by(username=username).first():
        return {"err":"not authorized"}
    
    project_updates = Table(projectname+"_updates",db.metadata,autoload_with=db.engine)

    try:
        query = db.session.query(project_updates).filter_by(approved=1)
        result = []

        for i in query:
            result.append(i.update_desc)

        return {'data':f'{result}'}
    except Exception as e:
        return {'err': f'Error: {str(e)}'}, 400


getunappupdates_bp = Blueprint('getunappupdates', __name__)

@getunappupdates_bp.route('/getunappupdates', methods=['GET'])
@jwt_required(locations=["cookies"])
def getupdates():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 401
    
    data = request.json
    projectname = data.get('project_data_name')
    username=user.username
    inspector = inspect(db.engine)
    project = Table(projectname,db.metadata,autoload_with=db.engine)
    
    if not ProjectsTable.query.filter_by(projectname=projectname).first():
        return {'err': 'Project not found'}, 400
    
    if not user.isAdmin and not db.session.query(project).filter_by(username=username).first():
        return {"err":"not authorized"}
    
    project_updates = Table(projectname+"_updates",db.metadata,autoload_with=db.engine)

    try:
        query = db.session.query(project_updates).filter_by(approved=0)
        result = []

        for i in query:
            result.append(i.update_desc)

        return {'data':f'{result}'}
    except Exception as e:
        return {'err': f'Error: {str(e)}'}, 400
    