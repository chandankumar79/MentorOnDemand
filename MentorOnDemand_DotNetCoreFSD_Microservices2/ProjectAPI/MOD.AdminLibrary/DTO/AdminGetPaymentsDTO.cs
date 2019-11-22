using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.AdminLibrary.DTO
{
    public class AdminGetPaymentsDTO
    {
        public string PaymentId { get; set; }
        public string UserEmail { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateOfTransaction { get; set; } = new DateTime();
        public bool TransactionType { get; set; }  // true = Deposit, false = Withdrawal
    }
}
