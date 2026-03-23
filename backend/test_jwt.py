import requests

base_url = "http://127.0.0.1:5000"

# 1. Login
login_res = requests.post(f"{base_url}/login", json={"email": "hr@hireintel.com", "password": "admin123"})
print("Login status:", login_res.status_code)
print("Login body:", login_res.text)

if login_res.status_code == 200:
    token = login_res.json().get("access_token")
    print("Got token:", token[:10] + "...")
    
    # 2. Test /hr/job
    job_res = requests.post(
        f"{base_url}/hr/job",
        json={"title": "Test", "description": "Test"},
        headers={"Authorization": f"Bearer {token}"}
    )
    print("Job status:", job_res.status_code)
    print("Job body:", job_res.text)
