<?php

namespace Arins\Services\Locater;

use Arins\Services\Locater\LocaterInterface;
use Arins\Services\Locater\Locater;

class Geocoding implements LocaterInterface
{
    protected $result;

    /**
     * Comment template.
     *
     * @param  boolean     $par1
     * @param  int         $par2
     * @param  string      $par3
     * @param  string|null $par4
     * @param  mixed|null  $par5
     * @return array|string|int|boolean
     */


    public function __construct()
    {
    }

    /**
     * ======================================================
     * Basic
     * ====================================================== */
    public function locate($par1 = null)
    {
        $host = $par1;

        //fetch api/webservices
        $response = $this->fetch($host);

        return json_decode($response);
    } //end method

    protected function fetch($host)
    {
        if ( function_exists('curl_init') ) {
                            
            //use cURL to fetch data
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $host);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_USERAGENT, 'geoPlugin PHP Class v1.1');
            $response = curl_exec($ch);
            curl_close ($ch);
            
        } else if ( ini_get('allow_url_fopen') ) {
            
            //fall back to fopen()
            $response = file_get_contents($host, 'r');
            
        } else {

            trigger_error ('geoPlugin class Error: Cannot retrieve data. Either compile PHP with cURL support or enable allow_url_fopen in php.ini ', E_USER_ERROR);
            return;
        
        } //end if

        return $response;
    } //end method

} //end class
