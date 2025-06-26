from app import db  

class UserCreds(db.Model):
    __tablename__ = 'user_creds'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    isAdmin = db.Column(db.Boolean, nullable=False, default=False)
    score = db.Column(db.Integer, nullable=False)

    def __init__(self, username, email, password, isAdmin, score):
        self.username = username
        self.email = email
        self.isAdmin =isAdmin
        self.password = password
        self.score = score

    def __repr__(self):
        return f'<User {self.username}>'

class ProjectsTable(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    projectname = db.Column(db.String(80), unique=True, nullable=False)
    projectProgress = db.Column(db.Integer, nullable=False)
    approved = db.Column(db.Boolean, nullable=False)

    def __init__(self,projectname, projectProgress,approved):
        self.projectname = projectname
        self.projectProgress = projectProgress
        self.approved = approved

class DemoProjectMembers(db.Model):
    __tablename__ = 'demo_project'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    isLeader = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, username, email, isLeader):
        self.username = username
        self.email = email
        self.isLeader = isLeader


