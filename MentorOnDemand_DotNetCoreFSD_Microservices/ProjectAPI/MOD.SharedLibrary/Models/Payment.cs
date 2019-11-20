using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MOD.SharedLibrary.Models
{
    public class Payment
    {
        [Key]
        public string PaymentId { get; set; }
        [Required]
        public MODUser User { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public DateTime DateOfTransaction { get; set; } = DateTime.Now;
        [Required]
        public bool TransactionType { get; set; }  // true = Deposit, false = Withdrawal
    }
}
