# blog/utils.py

import random
import string

def generate_otp(length=6):
    """Generate a random OTP (One Time Password)"""
    characters = string.digits  # Only digits for OTP
    otp = ''.join(random.choice(characters) for _ in range(length))
    return otp