<<<<<<< HEAD
from flask import Flask, render_template
from supabase import create_client, Client
import logging

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Supabase URL and Key
SUPABASE_URL = "https://zxtiesdgwzfbtlpbtehj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dGllc2Rnd3pmYnRscGJ0ZWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzY3NTQsImV4cCI6MjA2MjcxMjc1NH0.PcUe_AbdHuQDcOuKSii5s1ChUg3Z1NaFY2C7zqms6Ks"

# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def create_internships_table():
    try:
        # Insert a sample internship to create the table if it doesn't exist
        sample_internship = {
            'title': 'Web Development Intern',
            'company': 'Tech Solutions Inc.',
            'description': 'Looking for a web development intern to work on exciting projects using modern technologies.',
            'requirements': 'Knowledge of HTML, CSS, and JavaScript',
            'location': 'Remote',
            'duration': '3 months'
        }
        supabase.table('internships').insert(sample_internship).execute()
        logger.info("Internships table created successfully with sample data")
    except Exception as e:
        logger.error(f"Error creating internships table: {str(e)}")
        # If the error is not about the table already existing, raise it
        if "already exists" not in str(e).lower():
            raise

@app.route('/')
def index():
    try:
        # Create table if it doesn't exist
        create_internships_table()
        
        # Fetch internships from the table
        response = supabase.table('internships').select('*').execute()
        internships = response.data  # Data fetched from Supabase
        
        return render_template('internship.html', internships=internships)
    except Exception as e:
        logger.error(f"Error in index route: {str(e)}")
        return render_template('internship.html', internships=[], error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
=======
from flask import Flask, render_template
from supabase import create_client, Client

# Initialize Flask app
app = Flask(__name__)

# Supabase URL and Key
SUPABASE_URL = "https://zxtiesdgwzfbtlpbtehj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dGllc2Rnd3pmYnRscGJ0ZWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzY3NTQsImV4cCI6MjA2MjcxMjc1NH0.PcUe_AbdHuQDcOuKSii5s1ChUg3Z1NaFY2C7zqms6Ks"

# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/')
def index():
   
    response = supabase.table('items').select('*').execute()
    items = response.data  # Data fetched from Supabase
    
    return render_template('internship.html', items=items)

if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> eb0f4cccab161230e92a15bdb76d2fe38bf834b6
