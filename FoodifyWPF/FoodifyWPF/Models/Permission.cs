using System;
using System.Collections.Generic;

namespace FoodifyWPF.Models;

public partial class Permission
{
    public int Id { get; set; }

    public int Szint { get; set; }

    public string Név { get; set; } = null!;

    public string Leírás { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
