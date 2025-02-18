using System;
using System.Collections.Generic;

namespace FoodBackEnd.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Userorder> Userorders { get; set; } = new List<Userorder>();
}
