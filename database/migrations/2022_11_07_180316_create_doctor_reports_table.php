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
        Schema::create('doctor_reports', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->date('date')->nullable();

            $table->integer('Ront');
            $table->integer('Func');
            $table->integer('Pain');
            $table->integer('Swell');
            $table->integer('Sediment');
            $table->decimal('CRP',10,2);
            $table->integer('VAS');
            $table->integer('VASp');
            $table->decimal('DAS',10,2);

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
        Schema::dropIfExists('doctor_reports');
    }
};
