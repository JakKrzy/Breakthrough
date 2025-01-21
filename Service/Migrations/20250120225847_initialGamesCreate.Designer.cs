﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Service.Context;

#nullable disable

namespace Service.Migrations
{
    [DbContext(typeof(BreakthroughDbContext))]
    [Migration("20250120225847_initialGamesCreate")]
    partial class initialGamesCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Service.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("LoserId")
                        .HasColumnType("int");

                    b.Property<int>("WinnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoserId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Service.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Player1Id")
                        .HasColumnType("int");

                    b.Property<int?>("Player2Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Player1Id")
                        .IsUnique()
                        .HasFilter("[Player1Id] IS NOT NULL");

                    b.HasIndex("Player2Id")
                        .IsUnique()
                        .HasFilter("[Player2Id] IS NOT NULL");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Service.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Nickname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Service.Models.Game", b =>
                {
                    b.HasOne("Service.Models.User", "Loser")
                        .WithMany("LostGames")
                        .HasForeignKey("LoserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Service.Models.User", "Winner")
                        .WithMany("WonGames")
                        .HasForeignKey("WinnerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Loser");

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("Service.Models.Room", b =>
                {
                    b.HasOne("Service.Models.User", "Player1")
                        .WithOne()
                        .HasForeignKey("Service.Models.Room", "Player1Id");

                    b.HasOne("Service.Models.User", "Player2")
                        .WithOne()
                        .HasForeignKey("Service.Models.Room", "Player2Id");

                    b.Navigation("Player1");

                    b.Navigation("Player2");
                });

            modelBuilder.Entity("Service.Models.User", b =>
                {
                    b.Navigation("LostGames");

                    b.Navigation("WonGames");
                });
#pragma warning restore 612, 618
        }
    }
}
