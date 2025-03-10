using System;
using System.Collections.Generic;

namespace FoodBackEnd.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Category { get; set; } = null!;

    public byte[] Logo { get; set; } = null!;
}
