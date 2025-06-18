export function isMaliciousString(input: string): boolean {
    const maliciousPayloads: string[] = [
    "' OR '1'='1", // SQL Injection
    "'; DROP TABLE users; --", // SQL Injection destrutivo
    "<script>alert('xss')</script>", // XSS básico
    "<img src=x onerror=alert(1)>", // XSS via imagem
    "javascript:alert('XSS')", // URI XSS
    "`rm -rf /`", // Command Injection (Linux)
    "$(reboot)", // Command Injection (bash)
    "|| ping 127.0.0.1", // Command Injection com pipe
    "../../etc/passwd", // Path Traversal
    "%3Cscript%3Ealert(1)%3C/script%3E", // XSS URL encoded
    "admin' --", // SQL auth bypass
    "<iframe src='javascript:alert(1)'></iframe>", // XSS via iframe
    "' OR 1=1 --", // SQL Injection comum
    "1; EXEC xp_cmdshell('dir'); --", // SQL Server command injection
    ";shutdown -h now", // Command injection (Linux shutdown)
  ];

  return maliciousPayloads.some((string) => string === input);
};