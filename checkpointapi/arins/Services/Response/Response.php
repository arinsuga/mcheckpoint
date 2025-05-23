<?php

namespace Arins\Services\Response;

use Arins\Services\Response\ResponseAbstract;
use Arins\Services\Response\ResponseInterface;

class Response extends ResponseAbstract
               implements ResponseInterface
{
    public function viewModel($parData = null, $parFormAction = null)
    {
        return $this->toObject(
            config('response.status.ok', true),
            config('response.code.ok.number', 200), 
            config('respnse.code.ok.message', 'OK'),
            null,
            $parData,
            $parFormAction
        );
    }

    public function viewJson($parData = null, $parFormAction = null)
    {
        return $this->toJson(
            config('response.status.ok', true),
            config('response.code.ok.number', 200), 
            config('respnse.code.ok.message', 'OK'),
            null,
            $parData,
            $parFormAction
        );
    }

    public function viewArray($parData = null, $parFormAction = null)
    {
        return $this->toArray(
            config('response.status.ok', true),
            config('response.code.ok.number', 200), 
            config('respnse.code.ok.message', 'OK'),
            null,
            $parData,
            $parFormAction
        );
    }

}
