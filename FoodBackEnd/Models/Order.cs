using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FoodBackEnd.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Userorder> Userorders { get; set; } = new List<Userorder>();
}
