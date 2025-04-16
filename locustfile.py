from locust import HttpUser , task, between

class QuickstartUser (HttpUser ):
    wait_time = between(1, 5)  # Time to wait between tasks

    @task(1)
    def index(self):
        self.client.get("http://127.0.0.1:8000/")  # Ensure the URL includes 'http://'

    @task(2)
    def about(self):
        self.client.get("http://127.0.0.1:8000/pages/terms")  # Ensure the URL includes 'http://'