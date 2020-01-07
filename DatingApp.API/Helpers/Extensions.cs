using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpContext reponse, string message)
        {
            reponse.Response.Headers.Add("Application-Error", message);
            reponse.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            reponse.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime dateTime)
        {
            var age = DateTime.Today.Year - dateTime.Year;
            if (dateTime.AddYears(age) > DateTime.Today)
                age--;
            return age;
        }
    }
}