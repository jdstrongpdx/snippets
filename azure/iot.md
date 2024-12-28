# Azure IOT Services
- enables devices with sensors and an internet connection to communicate with cloud-based systems via the internet

## Common Applications (Sensors)
- Environmental
- QR Code
- OCR Scanner
- Geo-location
- Infrared
- Ultrasonic
- Motion
- Tilt
- Smoke
- Error
- Mechanical
- Flow

## Applications
- Messages are sent from the device to being a response
- Data is sent from the device and aggregated for reporting
- Software updates

## Decision Criteria
- Security is critical => Azure Sphere
- Dashboard and Reporting => Azure IoT Central
- Connect to devices without reporting => Azure IoT Hub

## Azure IoT Hub
- central message hub for bidirectional, secure communication
- allows command and control, 

## Azure IoT Central
- Adds a dashboard on top of IoT Hub to connect, monitor and manage IoT devices
- Watch all devices in aggregate
- Provides starter templates and device templates for configuration

## Azure Sphere
- end-to-end highly secure IoT solution 
    - Azure Sphere Micro-controller Unit (MCU) - processing, OS, and signal processing from sensors
    - Linux OS and software
    - Azure Security Service AS3 - authentication, tampering, secure communication