using System;
using System.Collections.Generic;

namespace FoodifyWPF.Models;

public partial class Userorder
{
    public int Id { get; set; }

    public int OrdersId { get; set; }

    public int MenuId { get; set; }

    public virtual Menu Menu { get; set; } = null!;

    public virtual Order Orders { get; set; } = null!;
}
