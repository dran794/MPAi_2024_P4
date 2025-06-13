#!/usr/bin/env python3
"""
run_http_server.py
Launches `python -m http.server 8000`, opens /app.html, and guarantees clean shutdown on Ctrl+C.
"""

import os
import signal
import subprocess
import sys
import time
import webbrowser

def start_server():
    """Spawn the server in a new process group."""
    if os.name == "nt":  # Windows
        return subprocess.Popen(
            [sys.executable, "-m", "http.server", "8000"],
            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP
        )
    else:  # Unix / macOS / Linux
        return subprocess.Popen(
            [sys.executable, "-m", "http.server", "8000"],
            preexec_fn=os.setsid  # put child in its own process group
        )

def stop_server(proc):
    """Terminate the child process group cleanly."""
    if proc.poll() is not None:  # already dead
        return

    print("Stopping server ...")
    try:
        if os.name == "nt":
            proc.send_signal(signal.CTRL_BREAK_EVENT)
        else:
            os.killpg(proc.pid, signal.SIGINT)
        proc.wait(timeout=5)
    except (subprocess.TimeoutExpired, PermissionError):
        proc.kill()
        proc.wait()
    print("Server stopped.")

def main():
    server_proc = start_server()
    print("Serving on http://localhost:8000 — press Ctrl+C to quit.")

    # Give the server a moment to start before opening the browser
    time.sleep(1)

    # Automatically open the URL
    webbrowser.open("http://localhost:8000/app.html")

    try:
        server_proc.wait()
    except KeyboardInterrupt:
        pass
    finally:
        stop_server(server_proc)

if __name__ == "__main__":
    main()
