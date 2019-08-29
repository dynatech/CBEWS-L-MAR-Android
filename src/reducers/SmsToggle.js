import SendSMS from 'react-native-sms';

const SmsToggle = {
    EWI_SMS: async function () {
        let template = "Magandang tanghali po.\n\n"+
        "Alert 1 ang alert level sa Literon, Calbiga, Samar ngayong August 29, 2019 12:00 NN.\n"+
        "Maaaring magkaroon ng landslide dahil sa nakaraan o kasalukuyang ulan. Ang recommended response ay PREPARE TO ASSIST THE HOUSEHOLDS AT RISK IN RESPONDING TO A HIGHER ALERT. Inaasahan namin ang pagpapadala ng LEWC ng ground data mamaya bago mag-3:30 PM. Ang susunod na Early Warning Information ay mamayang 4:00 PM."
        this.OPEN_SMSAPP(template)
    },
    ROUTINE_SMS: async function () {
        // GET TEMPLATE FROM DB
        let template = "<TEST_TEMPLATE_ROUTINE>"
        this.OPEN_SMSAPP(template)
    },
    EXTENDED_SMS: async function () {
        // GET TEMPLATE FROM DB
        let template = "<TEST_TEMPLATE_EXTENDED>"
        this.OPEN_SMSAPP(template)
    },
    OPEN_SMSAPP: async function (template) {
        // GET NUMBER FROM DB
        SendSMS.send({
            body: template,
            recipients: ['0000000000000'],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
          }, (completed, cancelled, error) => {
            // console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error); 
          });
    }
};

export default SmsToggle;
