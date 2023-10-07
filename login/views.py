from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import LoginForm, SignupForm
from .models import CustomUser

def user_login(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('login:login')  # ログイン後に飛行記録画面へリダイレクト
            else:
                # 認証失敗時の処理
                pass
    else:
        form = LoginForm()
    return render(request, 'login/login.html', {'form': form})

def user_signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('signup:signup')  # サインイン後に飛行記録画面へリダイレクト
    else:
        form = SignupForm()
    return render(request, 'login/signup.html', {'form': form})

@login_required
def user_logout(request):
    logout(request)
    return redirect('login:login')
