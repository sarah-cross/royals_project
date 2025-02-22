App to display MLB leaderboards and player profiles. Django/Python backend with Angular frontend. 

Leaderboard features: sortable columns, search field, year selection, paginator, toggle between batting and pitching stats. 
Player profile features: profile information, batting/pitching stats over career; charts for batting trends, hit distribution, and base stealing percentage for batters and charts for pitching trends, bases allowed, and strikeouts per 9 innings for pitchers.

Backend: 
Django: 5.1.5
Python 3.11.6

Frontend: 
Angular CLI: 19.1.7
Angular Framework (Core): 19.1.6
Node.js: 18.20.6
npm: 10.8.2
TypeScript: 5.7.3

Backend setup: 
Install dependencies with pip install -r requirements.txt
Apply migrations with python manage.py migrate
Load data with python manage.py load_data
Run Django server with python manage.py runserver

Frontend setup: 
Navigate to frontend directory with cd frontend
Install dependencies with npm install
Start Angular server with ng serve
