namespace FoodBackEnd.DTOs
{
    public class LoggedUser
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public int? Permission { get; set; }

        public string Token { get; set; }

    }
}
