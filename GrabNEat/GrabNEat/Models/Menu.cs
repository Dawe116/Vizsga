using System;
using System.Collections.Generic;

namespace GrabNEat.Models;

public partial class Menu
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public byte[] Picture { get; set; } = null!;
}
