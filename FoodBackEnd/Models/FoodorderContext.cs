using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FoodBackEnd.Models;

public partial class FoodorderContext : DbContext
{
    public FoodorderContext()
    {
    }

    public FoodorderContext(DbContextOptions<FoodorderContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<County> Counties { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Userorder> Userorders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=foodorder;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("address");

            entity.HasIndex(e => e.CountyId, "County");

            entity.HasIndex(e => e.CountyId, "County_Id");

            entity.HasIndex(e => e.PostalCode, "Postal_code");

            entity.HasIndex(e => e.UserId, "User_Id").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.CountyId)
                .HasColumnType("int(11)")
                .HasColumnName("County_Id");
            entity.Property(e => e.Door)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(5)");
            entity.Property(e => e.Floor)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(5)");
            entity.Property(e => e.HouseNumber)
                .HasMaxLength(10)
                .HasColumnName("House_number");
            entity.Property(e => e.PostalCode)
                .HasColumnType("int(4)")
                .HasColumnName("Postal_code");
            entity.Property(e => e.Street).HasMaxLength(100);
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("User_Id");

            entity.HasOne(d => d.County).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.CountyId)
                .HasConstraintName("address_ibfk_2");

            entity.HasOne(d => d.User).WithOne(p => p.Address)
                .HasForeignKey<Address>(d => d.UserId)
                .HasConstraintName("address_ibfk_3");
        });

        modelBuilder.Entity<County>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("county");

            entity.HasIndex(e => e.Name, "Name");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("menu");

            entity.HasIndex(e => e.Name, "Name").IsUnique();

            entity.HasIndex(e => e.RestaurantId, "restaurantId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Picture).HasColumnType("mediumblob");
            entity.Property(e => e.RestaurantId)
                .HasColumnType("int(11)")
                .HasColumnName("restaurantId");

            entity.HasOne(d => d.Restaurant).WithMany(p => p.Menus)
                .HasForeignKey(d => d.RestaurantId)
                .HasConstraintName("menu_ibfk_1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.UserId, "userId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("userId");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("orders_ibfk_1");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("permissions");

            entity.HasIndex(e => e.Név, "Nev").IsUnique();

            entity.HasIndex(e => e.Szint, "Szint").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Leírás).HasMaxLength(50);
            entity.Property(e => e.Név).HasMaxLength(20);
            entity.Property(e => e.Szint).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("restaurant");

            entity.HasIndex(e => e.Name, "Name").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Category).HasMaxLength(25);
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.PermissionId, "Jog");

            entity.HasIndex(e => e.LoginNev, "LoginNev").IsUnique();

            entity.HasIndex(e => e.PermissionId, "PermissionId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Email).HasMaxLength(64);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.LoginNev).HasMaxLength(16);
            entity.Property(e => e.Name).HasMaxLength(64);
            entity.Property(e => e.PermissionId).HasColumnType("int(11)");
            entity.Property(e => e.ProfilePicturePath).HasMaxLength(64);
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");

            entity.HasOne(d => d.Permission).WithMany(p => p.Users)
                .HasPrincipalKey(p => p.Szint)
                .HasForeignKey(d => d.PermissionId)
                .HasConstraintName("user_ibfk_1");
        });

        modelBuilder.Entity<Userorder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("userorder");

            entity.HasIndex(e => e.MenuId, "menuId");

            entity.HasIndex(e => e.OrdersId, "ordersId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.MenuId)
                .HasColumnType("int(11)")
                .HasColumnName("menuId");
            entity.Property(e => e.OrdersId)
                .HasColumnType("int(11)")
                .HasColumnName("ordersId");

            entity.HasOne(d => d.Menu).WithMany(p => p.Userorders)
                .HasForeignKey(d => d.MenuId)
                .HasConstraintName("userorder_ibfk_2");

            entity.HasOne(d => d.Orders).WithMany(p => p.Userorders)
                .HasForeignKey(d => d.OrdersId)
                .HasConstraintName("userorder_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
