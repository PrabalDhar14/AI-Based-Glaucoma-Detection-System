from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import numpy as np
from PIL import Image
import tensorflow as tf

# Initialize Flask App
app = Flask(__name__, static_folder='static')
app.secret_key = 'your_secret_key'  # Required for session management

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Predefined user credentials
users = {
    "admin@example.com": "password",
    "turjoydhar01@gmail.com": "123456",
    "admin@gmail.com": "000000"
}

# Load the Glaucoma Detection Model
model = tf.keras.models.load_model('model/hybrid_model.h5')

# Allowed file extensions
def allowed_file(filename):
    return filename.lower().endswith(('png', 'jpg', 'jpeg'))

# Prediction function
def predict_glaucoma(filepath):
    image = np.array(Image.open(filepath).resize((256, 256))) / 255.0  # Correct size
    prediction = model.predict(np.expand_dims(image, axis=0))
    return "Positive for Glaucoma" if prediction[0][0] > 0.5 else "Negative for Glaucoma"

# Home Page (Renders index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        if email in users and users[email] == password:
            session['user'] = email  # Store user in session
            return redirect(url_for('dashboard'))
        else:
            error = "Invalid email or password. Please try again."
            return render_template('login.html', error=error)
    return render_template('login.html')

# Registration Page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        dob = request.form.get('dob')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        # Basic Password Match Validation
        if password != confirm_password:
            error = "Passwords do not match. Please try again."
            max_date = datetime.today().strftime('%Y-%m-%d')
            return render_template('register.html', error=error, max_date=max_date)

        # Store new user in dictionary (for demonstration, replace with DB logic)
        if email in users:
            error = "Email already registered. Try logging in."
            return render_template('register.html', error=error)
        users[email] = password
        
        # Redirect to Login Page after Successful Registration
        return redirect(url_for('login'))

    max_date = datetime.today().strftime('%Y-%m-%d')
    return render_template('register.html', max_date=max_date)

# Logout Route
@app.route('/logout')
def logout():
    session.pop('user', None)  # Clear session
    return redirect(url_for('login'))

# Dashboard Page (Upload and Prediction)
@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        file = request.files.get('file')
        if file and allowed_file(file.filename):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
            file.save(filepath)
            result = predict_glaucoma(filepath)
            return render_template('dashboard.html', result=result, filepath=filepath)
        else:
            error = "Invalid file format. Please upload PNG, JPG, or JPEG."
            return render_template('dashboard.html', error=error)
    
    return render_template('dashboard.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
