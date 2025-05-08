@echo off
:: Batch file to generate a keystore for Android signing

:: Define variables
set KEYSTORE_NAME=my-release-key.jks
set ALIAS=my-key-alias
set STOREPASS=your-keystore-password
set KEYPASS=your-key-password
set VALIDITY=9125
set KEYSTORE_PATH=android\app\%KEYSTORE_NAME%

:: Ensure keytool is accessible (update path if needed)
set JAVA_HOME="C:\Program Files\Java\jdk-17"
set KEYTOOL=%JAVA_HOME%\bin\keytool.exe

:: Create the keystore
%KEYTOOL% -genkey -v ^
  -keystore "%KEYSTORE_PATH%" ^
  -alias "%ALIAS%" ^
  -keyalg RSA ^
  -keysize 2048 ^
  -validity %VALIDITY% ^
  -storepass "%STOREPASS%" ^
  -keypass "%KEYPASS%" ^
  -dname "CN=Your Name, OU=Your Organization Unit, O=Your Organization, L=Your City, ST=Your State, C=US"

:: Verify the keystore
if exist "%KEYSTORE_PATH%" (
  echo Keystore created successfully at %KEYSTORE_PATH%
  %KEYTOOL% -list -v -keystore "%KEYSTORE_PATH%" -storepass "%STOREPASS%"
) else (
  echo Failed to create keystore
  exit /b 1
)