<?php
namespace Arins\Services\Response;

interface ResponseInterface
{
    public function viewModel($parData);
    public function viewJson($parData);
    public function viewArray($parData);
}
