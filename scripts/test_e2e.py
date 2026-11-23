import urllib.request
import json
import sys

BASE_URL = 'http://localhost:3000'

def request(url, method='GET', data=None, headers=None):
    if headers is None:
        headers = {}
    if data is not None and not isinstance(data, (bytes, str)):
        data = json.dumps(data).encode('utf-8')
        headers['Content-Type'] = 'application/json'
    elif isinstance(data, str):
        data = data.encode('utf-8')

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=10) as resp:
        content_type = resp.headers.get('Content-Type', '')
        raw = resp.read()
        if 'json' in content_type:
            return resp.status, json.loads(raw.decode('utf-8'))
        return resp.status, raw

def run_tests():
    passed = 0
    failed = 0

    def assert_test(name, condition, details=""):
        nonlocal passed, failed
        if condition:
            print(f"  ✓ [PASS] {name}")
            passed += 1
        else:
            print(f"  ✗ [FAIL] {name}: {details}")
            failed += 1

    print("\n=======================================================")
    print("   JARVIS AI 2.0 - AUTOMATED END-TO-END TEST SUITE    ")
    print("=======================================================\n")

    # 1. Page Availability Tests
    print(">> Phase 1: Public Website & App Route Status")
    routes = [
        '/',
        '/features',
        '/how-it-works',
        '/security',
        '/privacy',
        '/integrations',
        '/pricing',
        '/signin',
        '/signup',
        '/forgot-password',
        '/terms',
        '/app',
        '/app/dashboard',
        '/app/timetable',
        '/app/calendar',
        '/app/reminders',
        '/app/tasks',
        '/app/projects',
        '/app/business',
        '/app/marketing',
        '/app/meetings',
        '/app/bookings',
        '/app/career',
        '/app/education',
        '/app/research',
        '/app/documents',
        '/app/memory',
        '/app/integrations',
        '/app/audit',
        '/app/voice-settings',
        '/app/settings',
    ]

    for r in routes:
        status, _ = request(f"{BASE_URL}{r}")
        assert_test(f"Route '{r}' returns HTTP 200", status == 200, f"Status code: {status}")

    # 2. Multilingual Voice & AI Intent Tests
    print("\n>> Phase 2: Multilingual Voice & Intent Parsing")

    # English Reminder Test
    status, res = request(f"{BASE_URL}/api/chat", method='POST', data={
        'message': 'Jarvis, remind me to call the client at 4 PM.',
        'language': 'en'
    })
    assert_test("English voice task & reminder creation", 
                status == 200 and res.get('intent') == 'task_create' and res.get('detectedLanguage') == 'en',
                f"Result: {res}")

    # Telugu Voice Test
    status, res = request(f"{BASE_URL}/api/chat", method='POST', data={
        'message': 'Jarvis, repu morning 7 ki workout reminder pettu.',
        'language': 'te'
    })
    assert_test("Telugu voice command auto-detection & processing", 
                status == 200 and res.get('intent') == 'task_create' and res.get('detectedLanguage') == 'te',
                f"Result: {res}")

    # Hindi Voice Test
    status, res = request(f"{BASE_URL}/api/chat", method='POST', data={
        'message': 'Jarvis, kal mera interview hai, mujhe prepare karwao.',
        'language': 'hi'
    })
    assert_test("Hindi voice command auto-detection", 
                status == 200 and res.get('detectedLanguage') == 'hi',
                f"Result: {res}")

    # Telugu Project Progress Query Test
    status, res = request(f"{BASE_URL}/api/chat", method='POST', data={
        'message': 'Jarvis, naa project progress entha undi?',
        'language': 'te'
    })
    assert_test("Cross-language project status retrieval in Telugu", 
                status == 200 and res.get('intent') == 'project_query' and res.get('detectedLanguage') == 'te',
                f"Result: {res}")

    # Voice Task Completion Test
    status, res = request(f"{BASE_URL}/api/chat", method='POST', data={
        'message': 'I finished my workout.',
        'language': 'en'
    })
    assert_test("Voice task completion ('I finished my workout')", 
                status == 200 and res.get('intent') == 'task_complete',
                f"Result: {res}")

    # 3. Persistent Memory & Normalization Tests
    print("\n>> Phase 3: Persistent Memory & Normalization")
    status, mem_res = request(f"{BASE_URL}/api/memories")
    assert_test("Retrieve persistent memories", status == 200 and len(mem_res.get('memories', [])) > 0)

    # Add memory item
    status, new_mem = request(f"{BASE_URL}/api/memories", method='POST', data={
        'category': 'preference',
        'content': 'Operator prefers morning workout at 06:30 AM.',
        'normalizedSummary': 'Workout: 06:30 AM daily routine',
        'tags': ['routine', 'fitness']
    })
    assert_test("Store memory assertion", status == 200 and 'memory' in new_mem)

    # 4. Project Governance Tests
    print("\n>> Phase 4: Project Governance & Milestones")
    status, proj_res = request(f"{BASE_URL}/api/projects")
    assert_test("Retrieve active projects", status == 200 and len(proj_res.get('projects', [])) > 0)

    # Create new project
    status, created_proj = request(f"{BASE_URL}/api/projects", method='POST', data={
        'name': 'Autonomous Edge Speech Pipeline',
        'objective': 'Implement sub-500ms neural streaming audio',
        'category': 'technical',
        'deadline': '2026-12-31'
    })
    assert_test("Create project with milestones", status == 200 and created_proj.get('success'))

    # 5. Real Document Generation Tests
    print("\n>> Phase 5: Real Document Generation (PDF, DOCX, CSV)")
    # PDF
    status, pdf_raw = request(f"{BASE_URL}/api/documents/generate", method='POST', data={
        'title': 'Test Architecture Document',
        'content': 'Verification content for PDF export.',
        'docType': 'report',
        'format': 'pdf'
    })
    assert_test("Generate real PDF document", status == 200 and pdf_raw[:4] == b'%PDF', f"PDF header: {pdf_raw[:10]}")

    # DOCX
    status, docx_raw = request(f"{BASE_URL}/api/documents/generate", method='POST', data={
        'title': 'Test Business Proposal',
        'content': 'Verification content for DOCX export.',
        'docType': 'proposal',
        'format': 'docx'
    })
    # DOCX files are standard PK zip archives starting with b'PK\x03\x04'
    assert_test("Generate real DOCX Word document", status == 200 and docx_raw[:2] == b'PK', f"DOCX header: {docx_raw[:10]}")

    # 6. Progressive Web App Manifest & Service Worker Tests
    print("\n>> Phase 6: PWA Installation Assets")
    status, manifest = request(f"{BASE_URL}/manifest.webmanifest")
    assert_test("PWA manifest is valid JSON with display standalone", 
                status == 200 and manifest.get('display') == 'standalone')

    status, sw_raw = request(f"{BASE_URL}/sw.js")
    assert_test("Service worker script exists with offline & push handlers", 
                status == 200 and b'addEventListener' in sw_raw)

    print("\n=======================================================")
    print(f"  TEST RESULTS: {passed} PASSED, {failed} FAILED")
    print("=======================================================\n")

    if failed > 0:
        sys.exit(1)

if __name__ == '__main__':
    run_tests()
