using FoodifyWPF.Models;
using System.Security.Cryptography;
using System.Text;

namespace FoodifyWPF.DTOs
{
    public class LoginDTO
    {
        public string LoginName { get; set; }

        public string TmpHash { get; set; }

    }
}
