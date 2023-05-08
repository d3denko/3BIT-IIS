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
        Schema::create('v_medicine_treatments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->date('from');
            $table->date('till')->nullable();
            $table->integer('main')->default(0);

            $table->integer('dosage_time')->nullable();
            $table->integer('dosage_period')->nullable();

            $table->unsignedBigInteger('medicine_id');
            $table->foreign('medicine_id')->references('id')->on('medicines')->onDelete('cascade');

            $table->unsignedBigInteger('treatment_id');
            $table->foreign('treatment_id')->references('id')->on('treatments')->onDelete('cascade');

            $table->string('removal');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('v_medicine_treatments');
    }
};
