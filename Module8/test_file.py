# Sample file with fake secrets for testing

# AWS Keys
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# GitHub Tokens
GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GITHUB_PAT = "github_pat_11AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

# Stripe Keys
STRIPE_SECRET = "sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_TEST = "sk_test_xxxxxxxxxxxxxxxxxxxxxxxx"

# Google API Key
GOOGLE_API_KEY = "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# JWT Token (fake)
JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

# Slack Token
SLACK_TOKEN = "xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwxyz"

# Generic passwords / API keys
DATABASE_PASSWORD = "SuperSecretPass123!"
API_KEY = "1234567890abcdef1234567890abcdef12345678"
SECRET_TOKEN = "my-super-secret-token-987654321"

# Private Key (just the header)
"""
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA...
-----END RSA PRIVATE KEY-----
"""

# These should NOT be detected (for negative testing)
normal_variable = "hello world"
email = "user@example.com"
url = "https://api.github.com"