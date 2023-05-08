<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('v_substate_treatments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->date('from');
            $table->date('till')->nullable();

            $table->unsignedBigInteger('substate_id');
            $table->foreign('substate_id')->references('id')->on('substates')->onDelete('cascade');

            $table->unsignedBigInteger('treatment_id');
            $table->foreign('treatment_id')->references('id')->on('treatments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('v_substate_treatments');
    }
};
