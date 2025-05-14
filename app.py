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
