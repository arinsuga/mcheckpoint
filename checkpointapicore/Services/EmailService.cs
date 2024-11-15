// Namespace: checkpointapicore.Services
// Packages: Microsoft.Extensions.Configuration, System.Net.Mail

namespace checkpointapicore.Services
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient(_configuration["Email:SmtpServer"])
            {
                Port = int.Parse(_configuration["Email:SmtpPort"]),
                Credentials = new NetworkCredential(_configuration["Email:SmtpUser"], _configuration["Email:SmtpPass"]),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["Email:SenderEmail"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(to);

            smtpClient.Send(mailMessage);
        }
    }
}
