using System;
using System.Collections.Generic;

namespace FoodifyWPF.Models;

public partial class Menu
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public byte[] Picture { get; set; } = null!;

    public int RestaurantId { get; set; }

    public virtual Restaurant Restaurant { get; set; } = null!;

    public virtual ICollection<Userorder> Userorders { get; set; } = new List<Userorder>();
}
