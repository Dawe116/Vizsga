using System;
using System.Collections.Generic;

namespace FoodBackEnd.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int AddressId { get; set; }

    public int MenuId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual Menu Menu { get; set; } = null!;
}
