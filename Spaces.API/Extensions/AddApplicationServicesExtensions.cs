using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Spaces.DAL.Data;
using Spaces.DAL.Interfaces;
using Spaces.DAL.Repositories;
using Spaces.Services.Helpers;
using Spaces.Services.Interfaces;
using Spaces.Services.Services;

namespace Spaces.API.Extensions;

public static class AddApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUsersRepository, UserRepository>();
        services.AddScoped<IPostRepository, PostRepository>();
        services.AddScoped<ICommentRepository, CommentRepository>();
        services.AddScoped<ILikesRepository, LikesRepository>();
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<ICommentService, CommentService>();
        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<ITokenGenerator, TokenGenerator>();
        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        services.AddDbContext<SpacesContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("DefaultConnection"));

        });
        
        return services;
    }
}