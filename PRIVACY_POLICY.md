# Privacy Policy for USB Audio Receiver

**Effective Date:** September 14, 2026  
**Application:** USB Audio Receiver (`com.amjad.usbaudio`)

USB Audio Receiver ("we", "our", or "the application") is committed to protecting your privacy. This Privacy Policy explains how our application operates and handles user information.

### 1. Information Collection and Usage
USB Audio Receiver functions strictly as a local audio receiver utility that streams sound from your PC to your Android mobile device via a local USB / TCP connection.
* **No Personal Data Collected:** We do not collect, store, share, or sell any personally identifiable information (such as your name, email, IP address, device IDs, or phone number).
* **No Audio Storage or Recording:** Real-time digital audio streams received from your PC are processed in-memory solely for immediate playback through your device speaker or connected headphones. No audio data is ever recorded, analyzed, or transmitted to any external server or cloud service.
* **No Tracking or Analytics:** The application does not include any third-party tracking frameworks, analytics services (such as Firebase Analytics), or advertising SDKs.

### 2. Device Permissions
The application requests minimal permissions strictly necessary for its core operation:
* **Internet Permission (`android.permission.INTERNET`):** Used exclusively for local socket communication (TCP/IP port forwarding over USB via ADB or local subnet) between the sender PC program and this receiver application. No outbound telemetry or external server communication occurs.
* **Foreground Service (`android.permission.FOREGROUND_SERVICE`):** Enables uninterrupted real-time audio playback when the application runs in the background or when the screen turns off.
* **Wake Lock (`android.permission.WAKE_LOCK`):** Prevents CPU sleeping while active streaming is underway.

### 3. Third-Party Services
The application does not integrate any third-party advertising networks or external analytics SDKs.

### 4. Children’s Privacy
Our application does not knowingly collect or solicit any personal information from children under the age of 13.

### 5. Changes to This Privacy Policy
We may periodically update this policy. Any modifications will be posted here with an updated effective date.

### 6. Contact Us
If you have any questions or feedback regarding this Privacy Policy, please contact:
* **Developer Email:** [ضع إيميل التواصل الخاص بك هنا]
