echo "BUILD START"

# create a virtual environment named 'venv' if it doesn't already exist
python3.9 -m venv venv

# activate the virtual environment
source venv/bin/activate

# install all deps in the venv
pip install -r backend/requirements.txt

# collect static files using the Python interpreter from venv
python backend/manage.py collectstatic --noinput

echo "BUILD END"

# [optional] Start the application here 
python backend/manage.py runserver