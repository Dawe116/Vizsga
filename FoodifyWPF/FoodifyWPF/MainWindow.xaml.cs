using FoodifyWPF.Models;
using FoodifyWPF.UserManagemant;
using FoodifyWPF.RestaurantManagement;
using FoodifyWPF.Windows;
using FoodifyWPF.MenuManagenment;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FoodifyWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static string uId = "";
        static int SaltLength = 64;

        #region Salt, SHA256

        public static Dictionary<string, User> LoggedInUsers = new Dictionary<string, User>();

        public static string GenerateSalt()
        {
            Random random = new Random();
            string karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string salt = "";
            for (int i = 0; i < SaltLength; i++)
            {
                salt += karakterek[random.Next(karakterek.Length)];
            }
            return salt;
        }

        public static string CreateSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }
        #endregion

        public static HttpClient sharedClient = new HttpClient()
        {
            BaseAddress = new Uri("https://localhost:5000/")
        };

        public MainWindow()
        {
            InitializeComponent();
        }

        private void OpenLoginWindow_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.client = sharedClient;
            loginWindow.ShowDialog();
            if (uId != "")
            {
                mitemFelhasznalok.IsEnabled = true;
                mitemRestaurant.IsEnabled = true;
                mitMenu.IsEnabled = true;
                mitemBejelentkezes.Visibility = Visibility.Collapsed;
                miteKijelentkezes.Visibility = Visibility.Visible;
            }
            else
            {
                MessageBox.Show("Sikertelen bejelentkezés!");
            }
        }
        private void Kilepes_Click(object sender, RoutedEventArgs e)
        {
            uId = "";
            if(uId == "")
            {
                mitemFelhasznalok.IsEnabled = false;
                mitemRestaurant.IsEnabled = false;
                mitMenu.IsEnabled = false;
                mitemBejelentkezes.Visibility = Visibility.Visible;
                miteKijelentkezes.Visibility = Visibility.Collapsed;
            }
            
        }

        private void UserListWindow_Click(object sender, RoutedEventArgs e)
        {
            ListWindow listWindow = new ListWindow();
            listWindow.ShowDialog();
        }

        private void NewUserWindow_Click(object sender, RoutedEventArgs e)
        {
            NewUserWindow newUserWindow = new NewUserWindow();
            newUserWindow.ShowDialog();
        }

        private void UserModify_Click(object sender, RoutedEventArgs e)
        {
            UserModifyWindow userModifyWindow = new UserModifyWindow();
            userModifyWindow.ShowDialog();
        }

        private void RestaurantList_Click(object sender, RoutedEventArgs e)
        {
            RestaurantList restaurantList = new RestaurantList();
            restaurantList.ShowDialog();
        }

        private void NewRestaurant_Click(object sender, RoutedEventArgs e)
        {
            NewRestaurantWindow newRestaurantWindow = new NewRestaurantWindow();
            newRestaurantWindow.ShowDialog();
        }

        private void ModifyRestaurant_Click(object sender, RoutedEventArgs e)
        {
            ModifyRestaurant modifyRestaurant = new ModifyRestaurant();
            modifyRestaurant.ShowDialog();
        }

        private void MenuLista_Click(object sender, RoutedEventArgs e)
        {

            MenuListWindow menulist = new MenuListWindow();
            menulist.ShowDialog();

        }

        private void MenuAdd_Click(object sender, RoutedEventArgs e)
        {
            MenuAddWindow menuAdd = new MenuAddWindow();
            menuAdd.ShowDialog();
        }

        private void MenuModify_Click(object sender, RoutedEventArgs e)
        {
            MenuModifyWindow menuModify = new MenuModifyWindow();
            menuModify.ShowDialog();
        }


    }
}