**MLB statistics app to display leaderboards and player profiles. Django/Python backend with Angular frontend.** 

Leaderboard features: sortable columns, search field, year selection, paginator, toggle between batting and pitching stats. <br/>
Player profile features: profile information, batting/pitching stats over career; charts for batting trends, hit distribution, and base stealing percentage for batters and charts for pitching trends, bases allowed, and strikeouts per 9 innings for pitchers.

**Backend:** <br/>
Django: 5.1.5<br/>
Python 3.11.6<br/>
Django REST Framework: 3.15.2 <br/>
DORS Headers for API access from Angular <br/>
JWT Authentication <br/>

**Frontend:** <br/>
Angular CLI: 19.1.7<br/>
Angular Framework (Core): 19.1.6<br/>
Node.js: 18.20.6<br/>
npm: 10.8.2 <br/>
TypeScript: 5.7.3 <br/>
Angular Material <br/>
Chart.js <br/>

**Backend setup:** <br/>
Install dependencies: ```pip install -r requirements.txt```<br/>
Apply migrations: ```python manage.py migrate```<br/>
Load data: ```python manage.py load_data```<br/>
Run Django server: ```python manage.py runserver```<br/>

**Frontend setup:** <br/>
Navigate to frontend directory: ```cd frontend```<br/>
Install dependencies: ```npm install```<br/>
Start Angular server: ```ng serve```<br/>

[Demo Video](https://drive.google.com/file/d/168J8EhNVuH6Rw1gNNT7rtO7ShUIgACTL/view?usp=drive_link)
