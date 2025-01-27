using System;
using System.Collections.Generic;

namespace GrabNEat.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int AddressId { get; set; }

    public int MenuId { get; set; }
}
