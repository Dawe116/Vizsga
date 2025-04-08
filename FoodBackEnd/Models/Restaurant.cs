using System;
using System.Collections.Generic;

namespace FoodBackEnd.Models;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Category { get; set; }

    public byte[] Logo { get; set; } = null!;


}
