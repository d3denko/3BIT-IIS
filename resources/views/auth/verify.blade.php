@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Overiť emailovú adresu') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('Nový overovací link bol poslaný na Vašu emailovú adresu') }}
                        </div>
                    @endif

                    {{ __('Pred pokračovaním skontrolujte svoju emailovú adresu, či nebol poslaný overovací link.') }}
                    {{ __('Ak ste nedostali email, ') }},
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('kliknite sem pre odoslanie ďalšieho) }}</button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
