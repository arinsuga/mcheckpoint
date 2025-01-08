<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'api'], function ($router) {
    
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');


    //Absen
    // Route::resource('absen', 'Absen\AbsenController');
    Route::get('absen/check-by-email/{email}','Absen\AbsenController@check')->name('absen.check.by.email');

    // Route::get('/check-history','Absen\AbsenController@checkHistory')->name('absen.history');
    // Route::get('/check-history-admin','Absen\AbsenController@checkHistoryAdmin')->name('absen.history.admin');
    Route::post('absen/check-history-post','Absen\AbsenController@checkHistoryPost')->name('absen.history.post');

    Route::post('absen/checkin','Absen\AbsenController@checkin')->name('absen.checkin.post');
    Route::post('absen/checkout','Absen\AbsenController@checkout')->name('absen.checkout.post');
    

});
