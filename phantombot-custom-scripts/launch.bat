@echo off
setlocal enableextensions enabledelayedexpansion
set first=1
REM for /f "delims=" %%a in ("%comspec%") do set "compath=%%~DPa"
REM PATH %PATH%;%compath%;%JAVA_HOME%\bin\
REM WHERE java >nul 2>nul
REM IF %ERRORLEVEL% NEQ 0 (
REM     echo You must have Java installed, please install it from: https://java.com/download
REM     pause
REM     exit
REM )
runtime\bin\java -Dinteractive -Xms1m -Dfile.encoding=UTF-8 -jar PhantomBot.jar %1
endlocal
pause